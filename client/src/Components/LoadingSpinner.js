import { Spinner } from "react-bootstrap"


export const LoadingSpinner = (props) => {
    const isLoading = props.isLoading
    const style = props.style
    const size = props.size
    const variant = props.variant
    let animation = props.animation
    
    if(!animation){
        animation = 'border'
    }

    return (
        <div className="LoadingSpinner">
            {isLoading ? (
                <Spinner animation={animation} variant={variant} size={size} style={style}/>
            ) : (
                <></>
            )}
        </div>
    )
}

//