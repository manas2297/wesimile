<template>
  <div class="bouncing-ball-container">
    <div class="ball"></div>
    <div class="ball-shadow"></div>
  </div>
</template>

<style scoped>
.bouncing-ball-container {
  position: absolute;
  width: 30px;
  height: 200px;
  right: 15%;
  top: 20%;
  z-index: 1;
}

.ball {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 10px 10px, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
  animation: bounce 2s cubic-bezier(0.36, 0, 0.66, -0.56) infinite;
}

.ball-shadow {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 30px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
  animation: shadow 2s cubic-bezier(0.36, 0, 0.66, -0.56) infinite;
  filter: blur(2px);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(150px);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes shadow {
  0%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translateX(-50%) scale(2);
    opacity: 0.1;
  }
}

/* Add multiple balls with different positions and delays */
.bouncing-ball-container:nth-child(2) {
  left: 25%;
  top: 40%;
  transform: scale(0.7);
}

.bouncing-ball-container:nth-child(2) .ball,
.bouncing-ball-container:nth-child(2) .ball-shadow {
  animation-delay: -0.5s;
}

.bouncing-ball-container:nth-child(3) {
  left: 75%;
  top: 30%;
  transform: scale(0.5);
}

.bouncing-ball-container:nth-child(3) .ball,
.bouncing-ball-container:nth-child(3) .ball-shadow {
  animation-delay: -1s;
}
</style> 