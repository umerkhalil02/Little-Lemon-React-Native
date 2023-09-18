import { useRef, useEffect } from 'react';

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getSectionListData(data) {
  const SECTION_LIST_MOCK_DATA = [
    {
      title: 'Starters',
      data: [],
    },
    {
      title: 'Mains',
      data: [],
    },
    {
      title: 'Desserts',
      data: [],
    },
  ];
  data.map(item => {
    if (item.category === 'starters') {
      SECTION_LIST_MOCK_DATA[0].data.push({
        price: item.price,
        name: item.name,
        desc: item.description,
        image: item.image
      })
    }
    else if (item.category === 'mains') {
      SECTION_LIST_MOCK_DATA[1].data.push({
        price: item.price,
        name: item.name,
        desc: item.description,
        image: item.image
      })
    }
    else {
      SECTION_LIST_MOCK_DATA[2].data.push({
        price: item.price,
        name: item.name,
        desc: item.description,
        image: item.image
      })
    }
  })
  return SECTION_LIST_MOCK_DATA;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
