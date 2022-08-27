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
  
    return {
      body,
      setHorizontally,
      isHorizontal,
      setVertically,
    };
};
  
export default ship;