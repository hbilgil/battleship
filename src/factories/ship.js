const ship = function shipFactory(length) {

    let body = [];
    let location = [];
    let horizontal = false;
  
    function setLocation(locationArray) {
      locationArray.map((locationIndex) => location.push(locationIndex));
    }
  
    function getLocation() {
      return location;
    }
  
    for (let i = 0; i < length; i++) {
      body.push('');
    }
  
    function hit(hitIndex) {
      //body[hitIndex] = 'x';
      return body[hitIndex].classList.add('hit');
    }
  
    function isSunk() {
      return body.every((el) => el.className.includes('hit'));
      /*if (body.every((el) => el.className.includes('hit')) === true) {
        return true;
      }
      return false;*/
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
      setLocation,
      getLocation,
      hit,
      isSunk,
      setHorizontally,
      isHorizontal,
      setVertically,
      
    };
};
  
export default ship;