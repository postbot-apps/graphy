import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children?: ReactNode;
}

export const Portal: React.FC<PortalProps> = ({ children }: PortalProps) => {
  const [portalNode] = useState(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(portalNode);
    return () => {
      document.body.removeChild(portalNode);
    };
  }, [portalNode]);

  return createPortal(children, portalNode);
};
