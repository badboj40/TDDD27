import { Container, Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReactSlider from "react-slider";
import { setRatingFilter, setYearFilter } from "../store";
import './Slider.css'

export function SliderFilter(props) {
  const dispatch = props.dispatch;
  const containerStyle = props.containerStyle;
  const type = props.type;

  const yearFilterState = useSelector((state) => state.searchFilter.yearFilter);
  const ratingFilterState = useSelector((state) => state.searchFilter.ratingFilter);
  const sliderState = useSelector((state) => state.slider.slider);

  const title = type === "releaseYear" ? "Release year" : "Rating";
  const defaultValue = type === "releaseYear" ? yearFilterState : ratingFilterState;
  const min = type === "releaseYear" ? 1950 : 0;
  const max = type === "releaseYear" ? 2023 : 10;
  const thumbClassName = type === "releaseYear" ? "releaseYear-thumb" : "rating-thumb";
  const trackClassName = type === "releaseYear" ? "releaseYear-track" : "rating-track";
  const setFilter = type === "releaseYear" ? setYearFilter : setRatingFilter;

  return (
    <Container style={containerStyle}>
      <Offcanvas.Title>{title}</Offcanvas.Title>
      <ReactSlider
        className="horizontal-slider"
        key={sliderState}
        thumbClassName={thumbClassName}
        trackClassName={trackClassName}
        defaultValue={defaultValue}
        min={min}
        max={max}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        step={type === "releaseYear" ? 1 : 0.1}
        onAfterChange={(value) => {
          dispatch(setFilter(value));
        }}
      />
    </Container>
  );
}
