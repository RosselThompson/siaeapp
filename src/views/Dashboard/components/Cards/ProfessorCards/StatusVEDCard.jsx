import { Typography, Box, Grow } from '@material-ui/core';
import { Class, CheckCircleOutline } from '@material-ui/icons';
import { Card } from 'components/Card';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.grey[400],
    fontSize: '4.5rem',
    animation: '',
  },
  iconActive: {
    color: theme.palette.common.white,
    fontSize: '4.5rem',
  },
  cardSubtitle: {
    fontSize: '10px',
    lineHeight: '0.5',
  },
  cardSubtitleCompleted: {
    lineHeight: '0.5',
  },
  button: {
    borderRadius: '5px',
  },
}));

const StatusVEDCard = (props) => {
  const { isCompleted } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Card title={t('dashboard.prof.statusVED.card.title')} filled={isCompleted}>
      <Box marginTop={isCompleted ? '2.5em' : '1.5em'}>
        <Box textAlign="center">
          <Grow in timeout={1000}>
            {isCompleted ? (
              <CheckCircleOutline className={classes.iconActive} />
            ) : (
              <Class className={classes.icon} />
            )}
          </Grow>
          <Box marginX="1rem" marginTop="0.3rem">
            <Typography
              className={
                isCompleted
                  ? classes.cardSubtitleCompleted
                  : classes.cardSubtitle
              }
              variant="caption"
              color={isCompleted ? 'initial' : 'textSecondary'}
            >
              {isCompleted
                ? t('dashboard.prof.statusVED.card.applied')
                : t('dashboard.prof.statusVED.card.notApplied')}
            </Typography>
          </Box>
        </Box>
      </Box>
      {!isCompleted && (
        <Box textAlign="center" marginTop="2rem">
          <Typography variant="caption">
            Programado para Viernes 11/02/2021
          </Typography>
        </Box>
      )}
    </Card>
  );
};

StatusVEDCard.propTypes = {
  isCompleted: PropTypes.bool, // USER ALREADY HAS BEEN FILLED VED
};

export default StatusVEDCard;
