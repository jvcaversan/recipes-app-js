// ==================================-------------------COMPONENT-FOOTER-----------------------==================================
// ------------------------------------------------------------------------------------------------------------------------------

// =======================================================================
// -----------------------------IMPORT SCOPE------------------------------
// =======================================================================
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  // ============-------------HOOKS STATE SCOPE-------------==============
  // =====================================================================
  const [toRedirectFood, setRedirectFood] = useState(false);
  const [toRedirectDrink, setRedirectDrink] = useState(false);

  // ============---------------USEEFFECT SCOPE-------------============
  // ===================================================================
  useEffect(() => {
  }, []);

  // ============----------------RETURN SCOPE---------------==============
  // =====================================================================
  return (
    <footer>
      <nav
        data-testid="footer"
        className="footer"
      >
        <button className="BTN" onClick={ () => setRedirectDrink(true) } type="button">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="icone nav drinks"
          />
        </button>
        { toRedirectDrink && <Redirect to="/drinks" /> }

        <button onClick={ () => setRedirectFood(true) } type="button">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="icone nav foods"
          />
        </button>
        { toRedirectFood && <Redirect to="/foods" /> }
      </nav>
    </footer>
  );
}

export default Footer;
