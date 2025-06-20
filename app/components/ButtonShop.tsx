import '~/css/buttonShop.css';
const ButtonShop = ({ text = "Edit", icon = null, className = "", ...props }: any) => {
  return (
   
      <button {...props} className={`${className} btn`}>{text || "Shop now"}
      </button>

  );
}


export default ButtonShop;
