// components/Accordion.tsx
import { ReactNode, useState } from 'react';

type AccordionItem = {
  id: string;
  title: string;
  children: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultipleOpen?: boolean; // если true — можно открывать несколько сразу
};

export function Accordion({ items, allowMultipleOpen = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(item => item !== id));
    } else {
      setOpenItems(
        allowMultipleOpen
          ? [...openItems, id]
          : [id]
      );
    }
  };

  return (
    <div className="w-full ">
      {items.map(({ id, title, children }) => {
        const isOpen = openItems.includes(id);
        return (
          <div key={id} >
            <h3 className="m-0">
              <button
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${id}`}
                id={`header-${id}`}
                className="w-full px-4 py-2 text-left flex justify-between items-center focus:outline-none"
              >
                <span className='font-bold text-xs xm:text-lg '> {title}</span>
                <svg
                  className={`h-5 w-5 transform transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </h3>
            <div
              id={`panel-${id}`}
              role="region"
              aria-labelledby={`header-${id}`}
              className={`px-4 overflow-hidden  ${
                isOpen ? "max-h-[2000px] py-2" : "max-h-0"
              }`}
            >
              {children}
            </div>
          </div>
        );
      })}
    </div>
  );
}
