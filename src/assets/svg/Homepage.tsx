import type { SVGProps } from "react";
const SvgHomepage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <path fill="url(#homepage_svg__a)" d="M0 0h64v64H0z" />
    <defs>
      <pattern
        id="homepage_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#homepage_svg__b" transform="scale(.01563)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA9RJREFUeJztmk1oXFUUx3/nzst8hBSKn8WKZFXQLlR0U5uPVtpQDDR+NZOJUkSFgiAIbrqsK3HhrmLBhSJCXqIQq9hiVcbmNRTxA1GEitCV0hpdtE0T3xtn3nEzEyexM7Vm7rupeb/VvHPuPfO/f969d967AykpKSkpKesW0Q+/6g4vL5QM5ibXYpIkNvyWl8yEFy0svisiDynqWlOiiEKk1UcMMORajEP2GMBzrcIhnmmVUfAFSgJvrUhdBHlRkaeBn5anJBCRcVVeBqqdVmsDCf2ZK03+73Jn+u+VQxIDRP7MrMID9dxz+bGB1wEqfnB3jH5bj8/nCmazjPTNA4R+cAT0gPURrJJWd8C5xuABFH5ZyqgufQ6z0c9/d9FLjcEDiMRNubVLqzugKiqj2R/7jkZ3BrtRjgI5AIUvYzUPd/+5cLGSLRxWeGqpmMrB7Kbqq5VzmbvUcBy4LZlh/HdaGdCgSutFslWuXZ81R8tFsE67gbTKXTeDh6sb8L/HA752LSIlxR0S+cE+1yJc4ik65VqES9b9LpAa4FqAa1IDXAtwjXUDBL5AdBiR3YI+BoT11FkRGReRceCsbR2tSODBRd/PFwePNa4if+abGM1WK97whv3b5wDm3579rCtbOwbcZ1/PcpKfAiIn8oXMg43BA2zYv30uVzA7gU+TlpO4Abli/0vNb44ayEjffM7cOKzgJ6nH6SKo0+WNOl3e2LiW0a2V/Jn+J4DDSWlwZsDlqfKmKDLlKMqcWnynfHsjLockzo8NPC8qB8H+aY1tA2qq8v3KYOgHW7w4cxrkHmCr8TJB6AdbmtvkSv2vqHAAqNkUaNOASJSxfGngo+ZgZeLU/YgGQG9TuFfR04tTn29rblsoDryB6qPAH7ZE2jLggooO5UoD7zUHw8lgVyxxGeWWlR0EbjCxORFOBrua4/nS4Acquge4YEOoDQPmDbKjUByc+WdKXwB62vTtqbdZRqE4OGOQHUClUyIbWDBAL3XdWv2h01XrNX/vdF0LBsjmyvnMm6oqnaqoqhL96h3BwkGLlTVAhSejyWA6nDi5d7W1womTe6PJYBr0mU5oW4nNXWBExWy7erP21GuMdEDPFUkfh10LcE1qgGsBrkn0JLcqtWe9qtfdtk1XdTEpPZCwAT2jO88n+X3/BttT4I7Vl9De1ddojdU7QNDR0A9mqcWfgLnGx9o4g2EIeNyKuDq2p4AH+hoZ4drfbXTsl3Rb1v0ukBrgWoBrDNfJX1otUTUIH7tW4Q497uXE2xdSK5mYm13LSZJYmMsbL9FDmJSUlJSUlDXGX9cMLP8EHXGbAAAAAElFTkSuQmCC"
        id="homepage_svg__b"
        width={64}
        height={64}
      />
    </defs>
  </svg>
);
export default SvgHomepage;
