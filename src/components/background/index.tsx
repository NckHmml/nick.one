import * as React from "react";
import * as Three from "three";

export class Background extends React.Component {
  private camera: Three.PerspectiveCamera;
  private scene: Three.Scene;
  private renderer: Three.WebGLRenderer;
  private div: HTMLDivElement;
  private cubes = new Array<{
    mesh: Three.Mesh,
    rotate: {
      x: number,
      y: number
    }
  }>();

  private renderFrame = () => {
    this.renderer.render(this.scene, this.camera);
    this.cubes.forEach(cube => {
      cube.mesh.rotateX(cube.rotate.x);
      cube.mesh.rotateY(cube.rotate.y);
    });
    requestAnimationFrame(this.renderFrame);
  }

  private renderCubes() {
    const pixels = window.innerWidth * window.innerHeight;
    const pixelsPerCube = 10000;
    const geometry = new Three.BoxGeometry(10, 10, 10, 1, 1, 1);
    for (let i = 0; i < pixels / pixelsPerCube; i++) {
      const material = new Three.MeshLambertMaterial({ color: 0xFF8859 });
      const cube = new Three.Mesh(geometry, material);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.position.setX(Math.random() * window.innerWidth - window.innerWidth / 2);
      cube.position.setY(Math.random() * window.innerHeight - window.innerHeight / 2);
      cube.position.setZ(Math.random() * 300);
      this.scene.add(cube);
      const xSpeed =  Math.random() * 0.016 - 0.008;
      const ySpeed =  Math.random() * 0.016 - 0.008;
      this.cubes.push({
        mesh: cube,
        rotate: {
          x: xSpeed < 0 ? xSpeed - 0.002 : xSpeed + 0.002,
          y: ySpeed < 0 ? ySpeed - 0.002 : ySpeed + 0.002
        }
      });
    }
  }

  private renderLight() {
    const light1 = new Three.DirectionalLight(0xFFFFFF, 1);
    light1.position.set(1, 2, 2)
    light1.target.position.set(0, 0, 0);
    light1.castShadow = true;
    light1.shadow.camera.near = 1;
    this.scene.add(light1);
    const light2 = new Three.DirectionalLight(0xFFFFFF, 1);
    light2.position.set(-2, -1, 2)
    light2.target.position.set(0, 0, 0);
    light2.castShadow = true;
    light2.shadow.camera.near = 1;
    this.scene.add(light2);
  }

  public componentDidMount() {
    // Initialize here, else we break the server sided rendering
    this.scene = new Three.Scene();
    this.camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(0, 0, 500);

    this.renderer = new Three.WebGLRenderer({ alpha: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.div.append(this.renderer.domElement);

    this.renderCubes();
    this.renderLight();
    this.renderFrame();
  }

  public render() {
    return (
      <div className="c-background" ref={(ref) => this.div = ref} />
    );
  }
}