import Carousel from 'react-bootstrap/Carousel';

export default function Banner(props)
{
    return(
        <>
            
            
      <Carousel.Item>
      <img className="d-block w-100" src={"https://api.maristproject.online/"+props.image_url} alt={props.title}/>
        <Carousel.Caption>
          <h3>{props.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
        </>
    )
}