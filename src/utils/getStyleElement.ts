export default textContent => Object.assign(
    document.createElement('style'),
    { textContent }
)