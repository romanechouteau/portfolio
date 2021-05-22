uniform sampler2D uTexture;

varying vec2 vUv;
varying float vNoise;

void main() {
   vec3 color = texture2D(uTexture, vUv).xyz;
   float noise = vNoise * 0.5;
   float colorMix =  clamp(noise, 0., 1.);
   vec3 finalColor = mix(color, vec3(1., 1., 1.), noise);
   gl_FragColor = vec4(finalColor, 1.0);
}
