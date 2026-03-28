const canvas = document.getElementById("gl");
const gl = canvas.getContext("webgl");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

gl.viewport(0, 0, canvas.width, canvas.height);

// shaders
const vertex = `
attribute vec2 position;
void main(){
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

float circle(vec2 uv, vec2 pos, float r){
  return smoothstep(r, r-0.01, length(uv-pos));
}

void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 m = mouse / resolution;

  float d = 0.0;

  for(int i=0;i<6;i++){
    float t = time * (0.3 + float(i)*0.1);
    vec2 p = vec2(
      0.5 + 0.25*cos(t + float(i)),
      0.5 + 0.25*sin(t + float(i))
    );

    d += circle(uv, p + (m-0.5)*0.4, 0.2);
  }

  float col = smoothstep(0.2, 0.6, d);

  vec3 color = mix(vec3(0.0), vec3(0.2,0.6,0.3), col);

  gl_FragColor = vec4(color,1.0);
}
`;

function compile(type, source){
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  return s;
}

const program = gl.createProgram();
gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
gl.linkProgram(program);
gl.useProgram(program);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
-1,-1, 1,-1, -1,1,
-1,1, 1,-1, 1,1
]), gl.STATIC_DRAW);

const pos = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(pos);
gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

const uRes = gl.getUniformLocation(program, "resolution");
const uTime = gl.getUniformLocation(program, "time");
const uMouse = gl.getUniformLocation(program, "mouse");

let mouse = [0,0];

window.addEventListener("mousemove", e=>{
  mouse[0] = e.clientX;
  mouse[1] = canvas.height - e.clientY;
});

function render(t){
  gl.uniform2f(uRes, canvas.width, canvas.height);
  gl.uniform1f(uTime, t*0.001);
  gl.uniform2f(uMouse, mouse[0], mouse[1]);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
}

render();

window.addEventListener("resize", ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0,0,canvas.width,canvas.height);
});
