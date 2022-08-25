
import { 
    Table,
    Header,
    HeaderRow,
    HeaderCell,
    Body,
    Row,
    Cell,
} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useTheme } from '@table-library/react-table-library/theme';

import useTranslation from 'next-translate/useTranslation';

import logger from '../src/logger/loggerS'

function TablePage({ users }) {

    const { t } = useTranslation('table');

    const data = { nodes:users.results };

    const pagination = usePagination(data, {
        state: {
          page: 0,
          size: 10,
        },
        onChange: onPaginationChange,
      });
    
    function onPaginationChange(action, state) {
        //console.log(action, state);
    }

    const theme = useTheme({
      HeaderRow: `
        font-size: 20px !important;
        background-color: #FFFFFF !important;

        .th {
          border-top: 1px solid #a0a8ae;
          border-bottom: 1px solid #a0a8ae;
          background-color: #FFFFFF !important;
        }
      `,
      Row: `
        &:nth-of-type(odd) .td {
          background-color: #FFFFFF;
        }

        &:nth-of-type(even) .td {
          background-color: #f5f5f5;
        }
      `,
    });
    
    return (
      <div className="mt-5 mx-5">
        <Table  data={data} pagination={pagination} theme={theme}>
            {(tableList) => (
                <>
                <Header>
                    <HeaderRow>
                        <HeaderCell>Nombre</HeaderCell>
                        <HeaderCell>Apellidos</HeaderCell>
                        <HeaderCell>Sexo</HeaderCell>
                    </HeaderRow>
                </Header>
                <Body>
                    {tableList.map((item) => (
                    <Row key={item.login.uuid} item={item}>
                        <Cell>{item.name.first}</Cell>
                        <Cell>{item.name.last}</Cell>
                        <Cell>{item.gender}</Cell>
                    </Row>
                    ))}
                </Body>
                </>
            )}
        </Table>

        {/*<div style={{ display: 'flex', justifyContent: 'space-between' }} >
        <span>
        Total Pages: {pagination.state.getTotalPages(data.nodes)}
        </span>

        <span>
        Page:{' '}
        {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
            key={index}
            type="button"
            style={{
                fontWeight:
                pagination.state.page === index
                    ? 'bold'
                    : 'normal',
            }}
            onClick={() => pagination.fns.onSetPage(index)}
            >
            {index + 1}
            </button>
        ))}
        </span>
        </div>*/}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{t('franja-paginacion', { start: pagination.state.getPageBoundaries(data.nodes).start, end : pagination.state.getPageBoundaries(data.nodes).end, length:data.nodes.length})}</span>
          <span>
            <button
              type="button"
              disabled={pagination.state.page === 0}
              onClick={() => pagination.fns.onSetPage(0)}
            >
              {'|<'}
            </button>
            <button
              type="button"
              disabled={pagination.state.page === 0}
              onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
            >
              {t('anterior')}
            </button>

            <span>
            {pagination.state.getPages(data.nodes).map((_, index) => {
                
                //Cuando hay mas de 5, hago como Amazon jaja
                let max = pagination.state.getPages(data.nodes).length;
                if ( max > 5 && (index != 0 && index != max-1)) {
                    if ( ( index < 5 && pagination.state.page < 4 ) || 
                       ( index > max-5  && pagination.state.page > max-4 ) ){

                    }
                    else {
                        if ( index == 1 || index == max-2)  {
                            return (<button disabled key={index}>...</button>)
                        }
                        else 
                        if ( index < pagination.state.page-1 || index > pagination.state.page+1 ) {
                            return (<span key={index}></span>)
                        }
                    }
                }

                return (
                    <button
                    key={index}
                    type="button"
                    style={{
                        fontWeight:
                        pagination.state.page === index
                            ? 'bold'
                            : 'normal',
                    }}
                    onClick={() => pagination.fns.onSetPage(index)}
                    >
                    {index + 1}
                    </button>
                )
                }
            )}
            </span>

            <button
              type="button"
              disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)}
              onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
            >
              {t('siguiente')}
            </button>
            <button
              type="button"
              disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)}
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.getTotalPages(data.nodes) - 1)
              }
            >
              {'>|'}
            </button>
          </span>
        </div>
    </div>
    )
}

// This gets called on every request
export async function getServerSideProps(context) {
    logger.info(context)
    // Fetch data from external API
    //const res = await fetch(`https://randomuser.me/api/?nat=es&results=5000`)
    const response = await fetch(`https://randomuser.me/api/?nat=es&results=200&seed=abc&inc=gender,name,login`)
    const data = await response.json()
    //console.log(data)
  
    // Pass data to the page via props
    return { props: { users:data } }
  }

export default TablePage