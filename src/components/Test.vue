<template>
  <div>ddd
    <div>
      <video autoplay @loadeddata="mirror" ref="video"></video>
    </div>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {

  methods: {
    mirror () {
      const video = this.$refs.video
      const canvas = this.$refs.canvas

      const bounds = [0, 0, video.videoWidth, video.videoHeight]

      canvas.width = bounds[2]
      canvas.height = bounds[3]

      const ctx = canvas.getContext('2d')

      ctx.drawImage(video, ...bounds)
      ctx.save()
      ctx.getImageData(...bounds)
      ctx.restore()
      // ctx.clearRect(...bounds)

      requestAnimationFrame(this.mirror)
    }
  },

  mounted () {
    const video = this.$refs.video
    const CONSTRAINTS = { video: { facingMode: 'environment' } }

    navigator.mediaDevices.getUserMedia(CONSTRAINTS).then(stream => {
      video.srcObject = stream
    })
  }
}
</script>

<style>
video, canvas {
  // display: block;
}
</style>
