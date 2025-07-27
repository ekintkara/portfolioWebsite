"use client";
import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
interface Position {
  x: number;
  y: number;
}
interface AnimatedPosition extends Position {
  targetX: number;
  targetY: number;
  animationProgress: number;
}
interface GameState {
  snake: Position[];
  animatedSnake: AnimatedPosition[];
  food: Position;
  direction: Position;
  gameOver: boolean;
  score: number;
  isPlaying: boolean;
  lastScore: number;
  scoreAnimationTime: number;
  foodAnimationTime: number;
  gameOverAnimationTime: number;
  showScoreModal: boolean;
  modalStep: 'question' | 'response';
  modalMessage: string;
}
const GRID_SIZE = 20;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const FOOD_SIZE = 24; // Slightly bigger than grid but safe
export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const profileImageRef = useRef<HTMLImageElement | null>(null);
  const gameLoopRef = useRef<number>();
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    animatedSnake: [{ x: 10, y: 10, targetX: 10, targetY: 10, animationProgress: 1 }],
    food: { x: Math.floor(CANVAS_WIDTH / GRID_SIZE / 2), y: Math.floor(CANVAS_HEIGHT / GRID_SIZE / 2) }, // Center of canvas
    direction: { x: 0, y: 0 },
    gameOver: false,
    score: 0,
    isPlaying: false,
    lastScore: 0,
    scoreAnimationTime: 0,
    foodAnimationTime: 0,
    gameOverAnimationTime: 0,
    showScoreModal: false,
    modalStep: 'question',
    modalMessage: ''
  });
  // Load profile image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      profileImageRef.current = img;
    };
    img.src = 'https://avatars.githubusercontent.com/u/92255945?v=4';
  }, []);
  // Generate random food position
  const generateFood = useCallback((): Position => {
    // Simple approach: keep food well within boundaries
    const gridWidth = Math.floor(CANVAS_WIDTH / GRID_SIZE); // 20
    const gridHeight = Math.floor(CANVAS_HEIGHT / GRID_SIZE); // 15
    // Use 2 grid margin from all sides to be absolutely safe
    const margin = 2;
    const minX = margin;
    const maxX = gridWidth - margin - 1; // -1 for 0-based indexing
    const minY = margin;
    const maxY = gridHeight - margin - 1;
    // Debug: log the ranges
    console.log('Food generation ranges:', { minX, maxX, minY, maxY });
    const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    console.log('Generated food position:', { x, y });
    return { x, y };
  }, []);
  // Animation helper functions
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };
  const lerp = (start: number, end: number, progress: number): number => {
    return start + (end - start) * progress;
  };
  // Update animated snake positions
  const updateAnimations = useCallback(() => {
    setGameState(prev => {
      const now = Date.now();
      // Update animated snake positions
      const updatedAnimatedSnake = prev.animatedSnake.map(segment => {
        if (segment.animationProgress < 1) {
          const newProgress = Math.min(1, segment.animationProgress + 0.08); // Smooth animation speed
          return {
            ...segment,
            x: lerp(segment.x, segment.targetX, easeInOutQuad(newProgress)),
            y: lerp(segment.y, segment.targetY, easeInOutQuad(newProgress)),
            animationProgress: newProgress
          };
        }
        return segment;
      });
      return {
        ...prev,
        animatedSnake: updatedAnimatedSnake,
        foodAnimationTime: now,
        scoreAnimationTime: prev.score !== prev.lastScore ? now : prev.scoreAnimationTime,
        gameOverAnimationTime: prev.gameOver && prev.gameOverAnimationTime === 0 ? now : prev.gameOverAnimationTime
      };
    });
  }, []);
  // Draw game with animations
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const now = Date.now();
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // Draw animated snake
    gameState.animatedSnake.forEach((segment, index) => {
      const x = segment.x * GRID_SIZE;
      const y = segment.y * GRID_SIZE;
      if (index === 0) {
        // Snake head with pulsing animation
        const pulseScale = 1 + Math.sin(now * 0.008) * 0.1;
        const headSize = (GRID_SIZE - 2) * pulseScale;
        const offset = ((GRID_SIZE - 2) - headSize) / 2;
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(x + offset, y + offset, headSize, headSize);
        // Add glow effect to head
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 8;
        ctx.fillRect(x + offset, y + offset, headSize, headSize);
        ctx.shadowBlur = 0;
      } else {
        // Snake body with gradient and slight wave motion
        const waveOffset = Math.sin(now * 0.005 + index * 0.5) * 1;
        const alpha = Math.max(0.7, 1 - (index * 0.05));
        ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
        ctx.fillRect(
          x + waveOffset,
          y,
          GRID_SIZE - 2,
          GRID_SIZE - 2
        );
      }
    });
    // Draw animated food (profile image)
    if (profileImageRef.current) {
      const baseX = gameState.food.x * GRID_SIZE - (FOOD_SIZE - GRID_SIZE) / 2;
      const baseY = gameState.food.y * GRID_SIZE - (FOOD_SIZE - GRID_SIZE) / 2;
      // Floating animation
      const floatOffset = Math.sin(now * 0.003) * 2;
      const pulseScale = 1 + Math.sin(now * 0.006) * 0.1;
      const foodX = baseX;
      const foodY = baseY + floatOffset;
      const foodSize = FOOD_SIZE * pulseScale;
      const sizeOffset = (FOOD_SIZE - foodSize) / 2;
      ctx.save();
      // Add glow effect around food
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(
        foodX + FOOD_SIZE / 2,
        foodY + FOOD_SIZE / 2,
        foodSize / 2,
        0,
        Math.PI * 2
      );
      ctx.clip();
      ctx.drawImage(
        profileImageRef.current,
        foodX + sizeOffset,
        foodY + sizeOffset,
        foodSize,
        foodSize
      );
      ctx.restore();
    } else {
      // Fallback animated food
      const pulseScale = 1 + Math.sin(now * 0.006) * 0.2;
      const size = GRID_SIZE * pulseScale;
      const offset = (GRID_SIZE - size) / 2;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(
        gameState.food.x * GRID_SIZE + offset,
        gameState.food.y * GRID_SIZE + offset,
        size,
        size
      );
    }
    // Game over animation
    if (gameState.gameOver && gameState.gameOverAnimationTime > 0) {
      const timeSinceGameOver = now - gameState.gameOverAnimationTime;
      const fadeProgress = Math.min(1, timeSinceGameOver / 1000); // 1 second fade
      ctx.fillStyle = `rgba(239, 68, 68, ${0.3 * fadeProgress})`;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    // Draw border
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, [gameState]);
  // Game logic with animation support
  const updateGame = useCallback(() => {
    if (!gameState.isPlaying || gameState.gameOver) return;
    setGameState(prevState => {
      // Don't move if no direction is set
      if (prevState.direction.x === 0 && prevState.direction.y === 0) {
        return prevState;
      }
      const newSnake = [...prevState.snake];
      const head = { ...newSnake[0] };
      // Move head
      head.x += prevState.direction.x;
      head.y += prevState.direction.y;
      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= CANVAS_WIDTH / GRID_SIZE ||
        head.y < 0 ||
        head.y >= CANVAS_HEIGHT / GRID_SIZE
      ) {
        return {
          ...prevState,
          gameOver: true,
          isPlaying: false,
          gameOverAnimationTime: Date.now(),
          showScoreModal: true,
          modalStep: 'question',
          modalMessage: ''
        };
      }
      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return {
          ...prevState,
          gameOver: true,
          isPlaying: false,
          gameOverAnimationTime: Date.now(),
          showScoreModal: true,
          modalStep: 'question',
          modalMessage: ''
        };
      }
      newSnake.unshift(head);
      // Create new animated snake with smooth transitions
      const newAnimatedSnake = newSnake.map((segment, index) => {
        const oldAnimated = prevState.animatedSnake[index];
        if (oldAnimated) {
          // Update existing segment with new target
          return {
            x: oldAnimated.x,
            y: oldAnimated.y,
            targetX: segment.x,
            targetY: segment.y,
            animationProgress: 0
          };
        } else {
          // New segment (snake grew)
          return {
            x: segment.x,
            y: segment.y,
            targetX: segment.x,
            targetY: segment.y,
            animationProgress: 1
          };
        }
      });
      // Check food collision
      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        return {
          ...prevState,
          snake: newSnake,
          animatedSnake: newAnimatedSnake,
          food: generateFood(),
          score: prevState.score + 10,
          lastScore: prevState.score,
          scoreAnimationTime: Date.now()
        };
      } else {
        newSnake.pop();
        const finalAnimatedSnake = newAnimatedSnake.slice(0, -1); // Remove last segment
        return {
          ...prevState,
          snake: newSnake,
          animatedSnake: finalAnimatedSnake
        };
      }
    });
  }, [gameState.isPlaying, gameState.gameOver, generateFood]);
  // Game loop
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver) {
      gameLoopRef.current = window.setInterval(updateGame, 150);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.gameOver, updateGame]);
  // Animation loop for smooth rendering
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      updateAnimations();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updateAnimations, draw]);
  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.isPlaying) return;
      const { direction } = gameState;
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) {
            setGameState(prev => ({ ...prev, direction: { x: 0, y: -1 } }));
          }
          break;
        case 'ArrowDown':
          if (direction.y === 0) {
            setGameState(prev => ({ ...prev, direction: { x: 0, y: 1 } }));
          }
          break;
        case 'ArrowLeft':
          if (direction.x === 0) {
            setGameState(prev => ({ ...prev, direction: { x: -1, y: 0 } }));
          }
          break;
        case 'ArrowRight':
          if (direction.x === 0) {
            setGameState(prev => ({ ...prev, direction: { x: 1, y: 0 } }));
          }
          break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isPlaying, gameState.direction]);
  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      // Set initial direction to right if no direction is set
      direction: prev.direction.x === 0 && prev.direction.y === 0 ? { x: 1, y: 0 } : prev.direction
    }));
  };
  const pauseGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: false }));
  };
  const resetGame = () => {
    setGameState({
      snake: [{ x: 10, y: 10 }],
      animatedSnake: [{ x: 10, y: 10, targetX: 10, targetY: 10, animationProgress: 1 }],
      food: { x: Math.floor(CANVAS_WIDTH / GRID_SIZE / 2), y: Math.floor(CANVAS_HEIGHT / GRID_SIZE / 2) }, // Center of canvas
      direction: { x: 0, y: 0 },
      gameOver: false,
      score: 0,
      isPlaying: false,
      lastScore: 0,
      scoreAnimationTime: 0,
      foodAnimationTime: 0,
      gameOverAnimationTime: 0,
      showScoreModal: false,
      modalStep: 'question',
      modalMessage: ''
    });
  };
  // Direction control functions
  const handleDirectionChange = (newDirection: Position) => {
    if (!gameState.isPlaying) return;
    const { direction } = gameState;
    // Prevent reversing into itself
    if (
      (newDirection.x === 1 && direction.x === -1) ||
      (newDirection.x === -1 && direction.x === 1) ||
      (newDirection.y === 1 && direction.y === -1) ||
      (newDirection.y === -1 && direction.y === 1)
    ) {
      return;
    }
    setGameState(prev => ({ ...prev, direction: newDirection }));
  };
  // Modal handlers
  const handleSaveScore = () => {
    setGameState(prev => ({
      ...prev,
      modalStep: 'response',
      modalMessage: 'Üzgünüm senin datanı tutmakla uğraşamam'
    }));
  };
  const handleDontSaveScore = () => {
    setGameState(prev => ({
      ...prev,
      modalStep: 'response',
      modalMessage: 'Sen bilirsin'
    }));
    // Redirect to Google after a short delay
    setTimeout(() => {
      window.location.href = 'https://google.com';
    }, 2000);
  };
  const closeModal = () => {
    setGameState(prev => ({
      ...prev,
      showScoreModal: false,
      modalStep: 'question',
      modalMessage: ''
    }));
  };
  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-accent/20 rounded-lg">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Eat me to grow! Use arrow keys or buttons to move.
        </p>
        <div className="relative">
          <p className="text-sm font-medium">Score: {gameState.score}</p>
          {gameState.score > gameState.lastScore && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-green-500 font-bold text-sm animate-bounce">
              +{gameState.score - gameState.lastScore}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-border rounded-lg"
        />
        {/* Direction Controls */}
        <div className="flex flex-col items-center space-y-2">
          <Button
            onClick={() => handleDirectionChange({ x: 0, y: -1 })}
            size="sm"
            variant="outline"
            className="w-12 h-12 p-0"
            disabled={!gameState.isPlaying}
          >
            <ArrowUp className="w-6 h-6" />
          </Button>
          <div className="flex space-x-2">
            <Button
              onClick={() => handleDirectionChange({ x: -1, y: 0 })}
              size="sm"
              variant="outline"
              className="w-12 h-12 p-0"
              disabled={!gameState.isPlaying}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => handleDirectionChange({ x: 1, y: 0 })}
              size="sm"
              variant="outline"
              className="w-12 h-12 p-0"
              disabled={!gameState.isPlaying}
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
          <Button
            onClick={() => handleDirectionChange({ x: 0, y: 1 })}
            size="sm"
            variant="outline"
            className="w-12 h-12 p-0"
            disabled={!gameState.isPlaying}
          >
            <ArrowDown className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        {!gameState.isPlaying && !gameState.gameOver && (
          <Button onClick={startGame} size="sm">
            <Play className="w-4 h-4 mr-1" />
            Start
          </Button>
        )}
        {gameState.isPlaying && (
          <Button onClick={pauseGame} size="sm" variant="outline">
            <Pause className="w-4 h-4 mr-1" />
            Pause
          </Button>
        )}
        <Button onClick={resetGame} size="sm" variant="outline">
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>
      {gameState.gameOver && !gameState.showScoreModal && (
        <div className="text-center">
          <p className="text-red-500 font-semibold">Game Over!</p>
          <p className="text-sm text-muted-foreground">Final Score: {gameState.score}</p>
        </div>
      )}
      {/* Score Save Modal */}
      {gameState.showScoreModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
            {gameState.modalStep === 'question' ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💀</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Game Over!
                  </h3>
                  <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
                    <p className="text-lg font-semibold text-yellow-400">
                      Final Score: {gameState.score}
                    </p>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Skorunu kaydetmek ister misin?
                  </p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleSaveScore}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    İsterim
                  </Button>
                  <Button
                    onClick={handleDontSaveScore}
                    className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                     İstemem
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">
                      {gameState.modalMessage === 'Sen bilirsin' ? '🤷‍♂️' : '😅'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-6 text-white">
                    {gameState.modalMessage}
                  </h3>
                  {gameState.modalMessage === 'Sen bilirsin' 
                  }
                  <Button
                    onClick={closeModal}
                    className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    👍 Tamam
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
