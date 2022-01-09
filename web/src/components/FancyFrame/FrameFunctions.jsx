// Material Components
// Main Components
// Styles
// Hooks and Function
import {
  Children,
  isValidElement,
  cloneElement
} from 'react';

const frameWidthGiver = size => (size >= 0 ? (-5 * size ** 2 + 45 * size + 30) : 0);
/**  0 -> 30, 1 -> 70, 2 -> 100 */
const frameEnlargePass = (allowMax, currentSize) => (currentSize < allowMax);
const frameShrinkPass = (allowMin, currentSize) => (currentSize > allowMin);
const childPropsGiver = (children, props) => Children.map(
  children, (child, i) => (isValidElement(child) ? cloneElement(child, {
    keyForChild: i,
    key: i,
    ...props
  }) : child)
);

export { 
  frameWidthGiver,
  frameEnlargePass,
  frameShrinkPass,
  childPropsGiver
};