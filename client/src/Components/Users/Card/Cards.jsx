/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function Cards({ children, noPadding, size }) {
  let width = '64';
  if (size === 'lg') {
    width = '4/6';
  }
  let classes = '  shadow-md shadow-gray-300 rounded-md mb-4 ml-5 overflow-hidden w-64 fixed';
  if (!noPadding) {
    classes += ' p-4';
  }
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

export default Cards;
