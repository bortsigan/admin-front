<template>
    <NuxtPage />
</template>

<script setup>
onMounted(() => {
  const bootstrapCss = document.createElement('link');
  bootstrapCss.rel = 'stylesheet';
  bootstrapCss.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css';
  bootstrapCss.integrity = 'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC';
  bootstrapCss.crossOrigin = 'anonymous';
  document.head.appendChild(bootstrapCss);

  const bootstrapJs = document.createElement('script');
  bootstrapJs.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js';
  bootstrapJs.integrity = 'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM';
  bootstrapJs.crossOrigin = 'anonymous';
  document.body.appendChild(bootstrapJs);
});
</script>
