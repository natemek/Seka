import React from 'react';

const Card = props => {
  // check_rot gets a rot prop(0-1) and assigns rotation value for card
  const check_rot = () => {
    return "rotate(" + ((props.rot-0.65) * 135) + "deg)"
  }

  const check_color = () => {
    if (props.suit === "❤" || props.suit === "♦") {
      return "red"
    }
  }

  const check_border = () => {
    if (props.selected) {
      return "green"
    }
    return "black"
  }

  const check_translate = () => {
    if (props.selected) {
      return 'translate(0px,-20px)'
    } 
    return 'translate(0px,0px)'
  }

  const check_animation = () => {
    if (props.selected) {
      return "popup"
    }
    return "popdown"
  }

  const check_hidden = () => {
    if (props.hidden) {
      return null
    } else {
      return props.rank + props.suit
    }
  }

  const check_class_name= () => {
    if (props.hidden) {
      return "card_back"
    } else {
      return "card"
    }
  }

  return (
    <>
    <button 
      className={check_class_name()}
      style={{
        // transform: check_rot() + ' ' + check_translate(),
        color: `${check_color()}`,
        borderColor: `${check_border()}`,
        "--rot": check_rot(),
        "--translate": check_translate(),
        animationName: props.animate,
        animationDuration: "1s",
        animationFillMode: "forwards"
      }}
      variant="secondary"
      id={props.id}
      onClick={() => {
        props.handle_card_selected(props.id)
        check_border()
        check_translate()
      }}
      >
        <div style={{position: 'absolute', top: '5%', left: '5%', fontSize: '16px'}}>
          {check_hidden()}
        </div>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '32px'}}>
          {check_hidden()}
        </div>
        <div style={{position: 'absolute', top: '85%', left: '65%', fontSize: '16px'}}>
          {check_hidden()}
        </div>
    </button>
    </>
  );
}

export default Card;
