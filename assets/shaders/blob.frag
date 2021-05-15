uniform vec3 color1;
uniform vec3 color2;

varying float vNoise;

void main() {
    vec3 finalColor = mix(color1, color2, vNoise);
    gl_FragColor = vec4(finalColor, 1.);
}
