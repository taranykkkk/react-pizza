import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';
import { DataItem } from '../../redux/pizzas/asyncActions';
import { selectFilter } from '../../redux/filter/selector';
import { useSelector } from 'react-redux';

type PaginationProps = {
  items: DataItem;
  setCurrentPage: (page: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({ items, setCurrentPage }) => {
  let meta = items.meta;
  let dataPagination: { [key: string]: number } = meta;
  const { currentPage } = useSelector(selectFilter);
  return (
    <div className={styles.wrapper}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=" 🍕"
        previousLabel="🍕 "
        onPageChange={(e) => setCurrentPage(e.selected + 1)}
        forcePage={currentPage - 1}
        pageRangeDisplayed={8}
        pageCount={
          Object.entries(items.meta).length ? dataPagination.total_pages : 1
        }
      />
    </div>
  );
};

export default Pagination;
