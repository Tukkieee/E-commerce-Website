export const SizeButton = ({name, handleSizeTag, sizeActive}) =>{
    return <button className={`size ${sizeActive?`active`: null}` } onClick={()=> handleSizeTag(name)}>{name}</button>
}