const ship = function shipFactory(length) {

    const body = [];
    let horizontal = false;
  
    for (let i = 0; i < length; i++) {
      body.push('');
    }
  
    function setHorizontally() {
      horizontal = true;
    }

    function setVertically() {
      horizontal = false;
    }

    function isHorizontal() {
      return horizontal;
    }

    function hit(hitIndex) { //will be used in tests
      body[hitIndex] = 'hit';
    }

    function isSunk() { //will be used in tests
      if (body.includes('') === false) {
        return true;
      }
      return false;
    }
  
    return {
      body,
      horizontal,
      setHorizontally,
      setVertically,
      isHorizontal,
      hit,
      isSunk
    };
};
  
export default ship;