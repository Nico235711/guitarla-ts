

export default function Guitar({ guitar, addToCart }) {
  const { price, description, image, name } = guitar

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img className="img-fluid" src={`/img/${image}.jpg`} alt={`guitarra: ${name}`} />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          // tiene que ser como callback porque si no, no espera al evento de click para llamar a la función
          onClick={() => addToCart(guitar)}
        >Agregar al Carrito</button>
      </div>
    </div>
  )
}
