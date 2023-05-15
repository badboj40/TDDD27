import { Card, Nav } from "react-bootstrap";
import { HandleMovieClick } from "../Helpers/HandleMovieClick";


export function CardBannerNav(props) {
    const notFoundLogo = "/static/images/unknown-file-icon.png"
    const movie_kv = props.movie_kv
    const dispatch = props.dispatch
    const navigate = props.navigate
    return (
        <Nav>
            <Nav.Link onClick={async () => { HandleMovieClick(movie_kv, dispatch, navigate) }}
                style={{ padding: 0 }}>
                <Card.Img variant="top"
                    src={movie_kv[1].banner}
                    onError={(e) => { e.target.src = notFoundLogo }} />
            </Nav.Link>
        </Nav>
    )
}