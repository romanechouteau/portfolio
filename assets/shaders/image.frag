uniform sampler2D uTexture;

varying vec2 vUv;
varying float vNoise;

void main() {
   vec3 color = texture2D(uTexture, vUv).xyz;
   float noise = vNoise * 0.5;
   float colorDark = clamp(noise + 1., 0., 1.);
   float colorLight = clamp(noise, 0., 1.);
   vec3 darkColor = mix(vec3(0., 0., 0.), color, colorDark);
   vec3 finalColor = mix(darkColor, vec3(1., 1., 1.), colorLight);
   gl_FragColor = vec4(finalColor, 1.0);
}
