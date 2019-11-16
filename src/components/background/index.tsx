import * as React from "react";
import { Vector2, Vector3, PerspectiveCamera, Scene, WebGLRenderer, Mesh } from "three";
import { WebGlAvailable } from "~/helpers/global";

export class Background extends React.Component {
  private size: Vector2;
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private div: HTMLDivElement;
  private cubes = new Array<{
    mesh: Mesh,
    rotate: Vector3
  }>();

  private renderFrame = () => {
    this.renderer.render(this.scene, this.camera);
    this.cubes.forEach(cube => {
      cube.mesh.rotateX(cube.rotate.x);
      cube.mesh.rotateY(cube.rotate.y);
      cube.mesh.rotateZ(cube.rotate.z);
    });
    requestAnimationFrame(this.renderFrame);
  }

  private renderCubes() {
    const { Three } = window;
    this.cubes = [];
    const pixels = this.size.x * this.size.y
    const pixelsPerCube = 12500;
    const geometry = new Three.BoxGeometry(10, 10, 10, 1, 1, 1);
    for (let i = 0; i < pixels / pixelsPerCube; i++) {
      const material = new Three.MeshLambertMaterial({ color: 0xFF8859 });
      const cube = new Three.Mesh(geometry, material);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.position.setX(Math.random() * this.size.x - this.size.x / 2);
      cube.position.setY(Math.random() * this.size.y - this.size.y / 2);
      cube.position.setZ(Math.random() * 300);
      this.scene.add(cube);
      const xSpeed = Math.random() * 0.016 - 0.008;
      const ySpeed = Math.random() * 0.016 - 0.008;
      const zSpeed = Math.random() * 0.016 - 0.008;
      this.cubes.push({
        mesh: cube,
        rotate: new Three.Vector3(
          xSpeed < 0 ? xSpeed - 0.002 : xSpeed + 0.002,
          ySpeed < 0 ? ySpeed - 0.002 : ySpeed + 0.002,
          zSpeed < 0 ? zSpeed - 0.002 : zSpeed + 0.002
        )
      });
    }
  }

  private renderLight() {
    const { Three } = window;

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

  private onResize = () => {
    const { Three } = window;

    const newSize = new Three.Vector2(
      Math.max(window.innerWidth, window.screen.availWidth),
      Math.max(window.innerHeight, window.screen.availHeight),
    );
    const orientation = this.size.y > this.size.x;
    const newOrientation = newSize.y > newSize.x;

    // We check if the orientation changes, this basically only happens on phones
    if (orientation != newOrientation) {
      this.size = newSize;
      this.renderer.setSize(this.size.x, this.size.y);
      // Re-render cubes
      this.cubes.forEach(c => this.scene.remove(c.mesh));
      this.renderCubes();
    }
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.onResize)
  }

  public componentDidMount() {
    System.import(/*webpackChunkName: "three" */ "three").then((Three: any) => {
      window.Three = Three;
      // Initialize here, else we break the server sided rendering
      if (WebGlAvailable) {
        window.addEventListener("resize", this.onResize)
        this.size = new Three.Vector2(
          Math.max(window.innerWidth, window.screen.availWidth),
          Math.max(window.innerHeight, window.screen.availHeight),
        );
        this.scene = new Three.Scene();
        this.camera = new Three.PerspectiveCamera(75, this.size.x / this.size.y, 1, 10000);
        this.camera.position.set(0, 0, 500);

        this.renderer = new Three.WebGLRenderer({ alpha: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setSize(this.size.x, this.size.y);
        this.div.append(this.renderer.domElement);

        this.renderCubes();
        this.renderLight();
        this.renderFrame();
      }
    });
  }

  public render() {
    return (
      <div className="c-background" ref={(ref) => this.div = ref} />
    );
  }
}