#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 waves(vec2 uv, float speed) {
    float smoothness = 2.0 / 0.5 + sin(uv.x * PI);
    float spiral_wave = 0.;
    vec3 color = vec3(1.0);

    if (uv.y >= 0.5) { 
      speed = speed / PI / 2.;
    } else { 
      speed = speed / PI / 2.;
      uv.y = 1. - uv.y;
    } 

    // Stretching
    uv.y = (uv.y - 0.2) * 1.8;
    uv.x = ((uv.x - 0.5) * smoothness) / ((uv.y - 0.5) * 8.0) ; 
    uv = uv / 3.2;

    // Stripes
    spiral_wave = sin(uv.x * 20. + sin(uv.y * 6.0 + (u_time * speed)) * 4.0);
    color = spiral_wave * vec3(1.);
    
    // Interpolate waves color
    float red_channel = clamp(0.3 + sin(u_time), 0.0, 1.0);

    // Colorize
    color *= vec3(red_channel, 0.4, 1.0) + vec3(0.0);
    return color;
}

vec3 spiral(vec2 uv, float speed) {
    // Convert to Polar Coordinates
    vec2 center = vec2(uv.x - 0.5, uv.y - 0.5);
    float angle = atan(center.y, center.x);
    float radius = length(center) * 2.;
    vec2 st = vec2(angle, radius);

    uv = st;

    vec3 color = vec3(1.0);

    // Stretching
    float stretching_factor = 2.4 / pow(uv.y, 0.8);
    uv.y = stretching_factor;
    
    // Tunnel pattern
    float spiral_wave = (sin((max(uv.y * 2.9, -1.0)) + u_time * speed) * 2.0);
    color = ((sin(uv.x * (40.))) + ( spiral_wave * 2.)) * vec3(1.0);
    color = smoothstep(0.0, 2.0, color);

    // Avoid infinity generation
    color = color * smoothstep(0.04, 0.05, radius);

    // Colorize
    color *= vec3(0.1, 0.1, 1.0) + vec3(0.0);
    return color;
}

vec3 blendNormal(vec3 base, vec3 blend) {
	return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
	return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float y = uv.y;
    float speed = 15.0;

    vec3 color = blendNormal(spiral(uv, speed),waves(uv, speed), 0.3);

    gl_FragColor = vec4(color, 1.0);
}
