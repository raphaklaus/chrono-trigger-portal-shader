import asset from "./waves.frag?raw"
      document.addEventListener("DOMContentLoaded", function(event) {
        console.log(window.glsl)

    const canvas = document.querySelector("#canvas")
    const options = {
      fragmentString: asset,
      alpha: false,
      antialias: true,
      mode: 'flat',
      extensions: ['EXT_shader_texture_lod'],
      onError: (e) => alert(e)
    };
    const glsl = new window.glsl.Canvas(canvas, options);
      })
