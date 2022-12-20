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
    
    // Convert to Polar Coordinates
    vec2 center = vec2(uv.x - 0.5, uv.y - 0.5);
    float angle = atan(center.y, center.x);
    float radius = length(center) * 2.;

    vec2 st = vec2(angle, radius);

    uv = st;

    vec3 color = vec3(y);

    // stretching
    float stretching_factor = 2.4 / pow(uv.y, 0.8);
    uv.y = stretching_factor;
    

    // Waves pattern
    float spiral_wave = (sin((max(uv.y * 2.9, -1.0)) + u_time * speed) * 2.0);
 
    color = ((sin(uv.x * (40.))) + ( spiral_wave * 2.)) * vec3(1.0);
    color = smoothstep(0.0, 2.0, color);
    // if (color.r > 0.9) {
    //   color = vec3(0.0);
    // }



    // color = spiral_wave * vec3(1.0);

    // minimum
    color = color * smoothstep(0.04, 0.05, radius);
    // Colorize
    color *= vec3(0.1, 0.1, 1.0) + vec3(0.0);

    gl_FragColor = vec4(color, 1.0);
}
