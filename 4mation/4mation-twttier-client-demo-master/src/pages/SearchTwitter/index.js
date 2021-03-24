import React, { useCallback, useState } from 'react';
import { Container,
  Badge,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardHeader,
  Row,
  Col
} from 'reactstrap';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import TwitterSearchForm from './TwitterSearchForm';
import { twitter } from '../../api';
import s from './SearchTwitter.module.scss';

const TWITTER_SEARCH_FORM = 'TWITTER_SEARCH_FORM';

function searchUser(username, user) {
  return twitter.users.search(user, {
    q: username
  });
}

export default () => {
  const user = useSelector(state => state.user.data);
  const [twitters, setTwitters] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearchFormChange = useCallback(_.debounce(values => {
    const username = _.get(values, 'username', '');
    if (username.length > 1) {
      setLoading(true);
      return searchUser(username, user).then(data => {
        setTwitters(data.searchUser);
        setLoading(false);
      });
    }
    setTwitters([]);
  }, 500), []);

  return (
    <Container>
      <h1 className="text-center">Search Twitter</h1>
      <TwitterSearchForm
        form={TWITTER_SEARCH_FORM}
        onSubmit={_.noop}
        onChange={onSearchFormChange}
      />
      {loading && <div className="text-center"><Badge color="primary">Loading...</Badge></div>}
      <Row>
      {
        twitters.map(twitter => {
          return (
            <Col key={twitter.id} className="mb-3" xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100" key={twitter.id}>
                <CardHeader><Link className={s.cardHeaderText} to={`/twitters/${twitter.id}`}>@{twitter.screen_name}</Link></CardHeader>
                <CardImg top src={twitter.profile_banner_url}/>
                <CardBody>
                  <CardTitle>{twitter.name}</CardTitle>
                </CardBody>
              </Card>
            </Col>
          );
        })
      }
      </Row>
    </Container>
  );
}