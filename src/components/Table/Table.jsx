import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Box,
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableCell as MaterialTableCell,
  TableHead as MaterialTableHead,
  TableRow as MaterialTableRow,
  TableContainer as MaterialTableContainer,
  IconButton,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  NavigateBefore,
  NavigateNext,
  FirstPage,
  LastPage,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowBody: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  rowColumn: {
    fontSize: '0.75rem',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: theme.palette.grey[700],
  },
  rowBodyActive: {
    backgroundColor: theme.palette.grey[300],
  },
}));

const Table = (props) => {
  const { data = [], columns = [], count = 0, setSelectedRow } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [selectedRowIndex, setselectedRowIndex] = useState(null);
  const allowedColumns = columns.map((e) => e.field);
  const rowData = data
    .map((e) =>
      Object.fromEntries(
        Object.entries(e).filter(([key]) => allowedColumns.includes(key))
      )
    )
    .slice(0, 10);

  return (
    <Box marginBottom="2rem" marginTop="1rem">
      <Box height="37rem">
        <MaterialTableContainer>
          <MaterialTable size="medium">
            <MaterialTableHead>
              <MaterialTableRow>
                {columns.map((e) => (
                  <MaterialTableCell key={e.field} align="left">
                    <span className={classes.rowColumn}>{t(e.title)}</span>
                  </MaterialTableCell>
                ))}
              </MaterialTableRow>
            </MaterialTableHead>
            <MaterialTableBody>
              {rowData.map((row, index) => (
                <MaterialTableRow
                  key={index}
                  className={
                    index === selectedRowIndex
                      ? classes.rowBodyActive
                      : classes.rowBody
                  }
                  onClick={() => {
                    setselectedRowIndex(index);
                    setSelectedRow(data[index]);
                  }}
                >
                  {Object.keys(row).map((e) => (
                    <MaterialTableCell key={e} align="left">
                      <Typography variant="caption">{row[e]}</Typography>
                    </MaterialTableCell>
                  ))}
                </MaterialTableRow>
              ))}
            </MaterialTableBody>
          </MaterialTable>
        </MaterialTableContainer>
      </Box>
      <Box
        margin="0.5rem"
        display="flex"
        alignItems="center"
        justifyContent={isDesktop ? 'flex-end' : 'center'}
      >
        <Box marginRight="1rem">
          <Typography variant="caption" color="textSecondary">
            <Trans
              i18nKey="table.count"
              values={{ count }}
              components={[<strong key="0" />]}
            />
          </Typography>
        </Box>
        <Box textAlign="center">
          <Tooltip title={t('table.firstPage')}>
            <IconButton>
              <FirstPage />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('table.prevPage')}>
            <IconButton>
              <NavigateBefore />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('table.nextPage')}>
            <IconButton>
              <NavigateNext />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('table.lastPage')}>
            <IconButton>
              <LastPage />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

Table.propTypes = {
  data: PropTypes.array, // DATA TO SHOW IN GRID
  columns: PropTypes.array, // COLUMNS TO SHOW IN THE GRID
  count: PropTypes.number, // TOTAL OF REGISTER
  setSelectedRow: PropTypes.func, // FUNCTION TO SET SELECTED ROW
};

export default Table;
