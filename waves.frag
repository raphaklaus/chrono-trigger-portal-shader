#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float y = uv.y;
    float speed = 9.0;
    
    vec3 color = vec3(y);

    float smoothness = 2.0 / 0.5 + sin(uv.x * PI);
    float spiral_wave = 0.;

    if (uv.y >= 0.52) { 
      uv.y = ( uv.y - 0.2 ) * 1.8;
      uv.x = ((uv.x - 0.5) * smoothness) / ( ((uv.y - 0.5) * 8.0) ); 
      spiral_wave = sin(uv.x * 20. + sin(uv.y * 2.0 + (u_time * 2.0)) * 2.0);
    } else if (uv.y < 0.48) { 
      uv.y = 1. - uv.y;
      uv.y = (uv.y - 0.2) * 1.8;
      uv.x = ((uv.x - 0.5) * smoothness) / ( ((uv.y - 0.5) * 8.0) ); 
      spiral_wave = sin(uv.x * 20. + sin(uv.y * 2.0 + (u_time * 2.0)) * 2.0);
    } 

    color = spiral_wave * vec3(1.);
    float red_channel = clamp(0.3 + sin(u_time), 0.0, 1.0);

    // Colorize
    color *= vec3(red_channel, 0.4, 1.0) + vec3(0.0);

    gl_FragColor = vec4(color, 1.0);
}
