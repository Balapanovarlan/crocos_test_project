import CardItem from "../CardItem/CardItem"

const CardList = () => {
  return (
    <div 
    className='flex flex-wrap gap-5 w-full max-w-[867px]'
    >
        <a href="#">
            <CardItem/>
        </a>
           <a href="#">
            <CardItem/>
        </a>
           <a href="#">
            <CardItem/>
        </a>
           <a href="#">
            <CardItem/>
        </a>
           <a href="#">
            <CardItem/>
        </a>
           <a href="#">
            <CardItem/>
        </a>
    </div>
  )
}

export default CardList