uniform sampler2D envMap;
uniform sampler2D backMap;
uniform vec2 resolution;
uniform float ior;

varying vec3 eyeVector;
varying vec3 worldNormal;

float Fresnel(vec3 eyeVector, vec3 worldNormal) {
	return pow( 1.0 + dot( eyeVector, worldNormal), 3.0 );
}

void main() {
	// get screen coordinates
	vec2 uv = gl_FragCoord.xy / resolution;

	vec3 backfaceNormal = texture2D(backMap, uv).rgb;

	float a = 0.33;
	vec3 normal = worldNormal * (1.0 - a) - backfaceNormal * a;
	// calculate refraction and add to the screen coordinates
	vec3 refracted = refract(eyeVector, normal, 1.0/ior);
	uv += refracted.xy;

	// sample the background texture
	vec4 tex = texture2D(envMap, uv);

	vec4 finalTexture = tex;

	// calculate the Fresnel ratio
	float f = Fresnel(eyeVector, normal);

	// mix the refraction color and reflection color
	finalTexture.rgb = mix(finalTexture.rgb, vec3(1.0), f);

	gl_FragColor = vec4(finalTexture.rgb, 1.0);
}