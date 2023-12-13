function IconSwitcher({
  icon,
  text,
  breakPoint = 'sm',
}) {
  return (
    <div style={{ height: '100%' }}>
      <h3
        className={`d-inline d-${breakPoint}-none`}
      >
        {icon}
      </h3>
      <h6
        className={`d-none d-${breakPoint}-inline`}
      >
        <strong>{text}</strong>
      </h6>
    </div>
  );
}

export default IconSwitcher;
