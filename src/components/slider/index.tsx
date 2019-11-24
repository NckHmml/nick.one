import * as React from "react";
import { ClassNames } from "~/helpers/global";

interface ISliderProps {
  onChange?: (value: number) => void;
  className?: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
}

interface ISliderState {
  value: number;
}

export class Slider extends React.Component<ISliderProps, ISliderState> {
  public static defaultProps: Partial<ISliderProps> = {
    step: 1
  };
  
  public state: ISliderState = {
    value: 0,
  };
  private cursor: HTMLDivElement;
  private dragging: boolean = false;
  private xPos: number;

  private onMouseDown = (event: MouseEvent) => {
    if (event.button === 0) {
      this.dragging = true;
      this.xPos = event.pageX - this.cursor.offsetLeft;
    }
  }

  private onMouseUp = () => {
    this.dragging = false;
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.dragging) return;
    this.setDistance(event.pageX - this.xPos);
  }

  private onTouchStart = (event: TouchEvent) => {
    this.dragging = true;
    const touch = event.changedTouches.item(0);
    this.xPos = touch.pageX - this.cursor.offsetLeft;
  }

  private onTouchMove = (event: TouchEvent) => {
    if (!this.dragging) return;

    const touch = event.changedTouches.item(0);
    this.setDistance(touch.pageX - this.xPos);
  }

  /** Sets the distance on the element */
  private setDistance = (distance: number) => {
    const max = this.cursor.parentElement.clientWidth - this.cursor.clientWidth;
    distance = Math.max(distance, 0);
    distance = Math.min(distance, max);
    this.cursor.style.left = `${distance}px`;
    this.calculate(distance / max);
  }

  /** Calculates the value based on the current percentage */
  private calculate = (percentage: number) => {
    const { min, max, step, onChange } = this.props;

    const worth = (max - min) * percentage;
    const value = Math.round(worth / step) * step + min;

    if (value !== this.state.value) {
      this.setState({ value }, () => {
        if (onChange) onChange(value);
      });
    }
  }

  /** Sets the distance based on the default value */
  private setDefault = () => {
    const { min, max, defaultValue } = this.props;
    const percentage = (defaultValue - min) / (max - min);
    const distance = this.cursor.parentElement.clientWidth - this.cursor.clientWidth;

    this.setDistance(distance * percentage);
  }

  public componentDidUpdate(prev: ISliderProps) {
    if (this.props.defaultValue !== prev.defaultValue) {
      this.setDefault();
    }
  }

  public componentDidMount() {
    this.cursor.addEventListener("mousedown", this.onMouseDown);
    this.cursor.addEventListener("touchstart", this.onTouchStart);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("touchend", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("touchmove", this.onTouchMove);

    if (this.props.defaultValue) {
      this.setDefault();
    }
  }

  public componentWillUnmount() {
    this.cursor.removeEventListener("mousedown", this.onMouseDown);
    this.cursor.removeEventListener("touchstart", this.onTouchStart);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("touchend", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("touchmove", this.onTouchMove);
  }

  public render() {
    const { className } = this.props;

    const rootClass = ClassNames({
      "c-slider": true,
      [`${className}`]: Boolean(className)
    });

    return (
      <div className={rootClass}>
        <div className="c-slider-line" />
        <div className="c-slider-cursor" ref={(ref) => this.cursor = ref} />
      </div>
    );
  }
}