import React from 'react';

const Card = props => {
  // check_rot gets a rot prop(0-1) and assigns rotation value for card
  const check_rot = () => {
    return "rotate(" + ((props.rot-0.65) * 135) + "deg)"
  }

  const check_color = () => {
    if (props.suit === "h" || props.suit === "d") {
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

  const check_hidden = () => {
    if (props.hidden) {
      return null
    } else {
      return check_rank() + convert_suit()
    }
  }

  const convert_suit = () => {
    switch (props.suit) {
      case "d": return "♦"
      case "h": return "❤"
      case "s": return "♠"
      case "c": return "♣"
      default: return ""
    }
  }

  const check_rank = () => {
    switch (props.rank) {
      case 1: return "A"
      case 11: return "J"
      case 12: return "Q"
      case 13: return "K"
      default: return props.rank
    }
  }

  const check_class_name = () => {
    if (props.hidden) {
      return "card_back"
    } else {
      return "card"
    }
  }

  const check_big_font_size = () => {
    if (props.rank === "10" && props.suit === "❤") {
      return "20px"
    } else if (props.suit === "h") {
      return "28px"
    } else {
      return "32px"
    }
  }

  const check_small_font_size = () => {
    if (props.rank === "10" && props.suit === "h") {
      return "13px"
    } else if (props.suit === "h") {
      return "14px"
    } else {
      return "16px"
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
        <div className="card-content-top-left" style={{fontSize: check_small_font_size()}}>
          {check_hidden()}
        </div>
        <div className="card-content-center"  style={{fontSize: check_big_font_size()}}>
          {check_hidden()}
        </div>
        <div className="card-content-bottom-right" style={{fontSize: check_small_font_size()}}>
          {check_hidden()}
        </div>
    </button>
    </>
  );
}

export default Card;
