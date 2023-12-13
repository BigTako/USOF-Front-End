import { Col, Container, Row, Stack } from 'react-bootstrap';
import SemiLightGreyIconTagButton from './SemiLightGreyIconTagButton';
import { BsClock, BsEmojiFrown, BsFire, BsPatchCheck } from 'react-icons/bs';
import { usePostsSelector } from '../contexts/PostsSelectContext';

function SortOptions() {
  const {
    sortBy,
    ascendingOrder,
    newestFirst,
    oldestFirst,
    popularFirst,
    unpopularFirst,
  } = usePostsSelector();
  return (
    <Stack
      direction="horizontal"
      gap={2}
      style={{
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
      }}
    >
      <SemiLightGreyIconTagButton
        as="button"
        className={`${
          sortBy === 'publishDate' && ascendingOrder ? 'active' : ''
        }`}
        onClick={newestFirst}
        icon={
          <h4>
            <BsPatchCheck />
          </h4>
        }
        text={<h5>Newest</h5>}
      />
      <SemiLightGreyIconTagButton
        as="button"
        className={`${
          sortBy === 'publishDate' && !ascendingOrder ? 'active' : ''
        }`}
        onClick={oldestFirst}
        icon={
          <h4>
            <BsClock />
          </h4>
        }
        text={<h5>Oldest</h5>}
      />
      <SemiLightGreyIconTagButton
        as="button"
        className={`${
          sortBy === 'likesCount' && !ascendingOrder ? 'active' : ''
        }`}
        onClick={popularFirst}
        icon={
          <h4>
            <BsFire />
          </h4>
        }
        text={<h5>Popular</h5>}
      />
      <SemiLightGreyIconTagButton
        as="button"
        className={`${
          sortBy === 'likesCount' && !ascendingOrder ? 'active' : ''
        }`}
        onClick={unpopularFirst}
        icon={
          <h4>
            <BsEmojiFrown />
          </h4>
        }
        text={<h5>Unpopular</h5>}
      />
    </Stack>
  );
}

function PostsSortMenu() {
  return (
    <Container fluid>
      <Row
        style={{
          justifyContent: 'space-evenly',
        }}
      >
        <Col sm={3} md={3}>
          <h2 className="d-none d-sm-block">
            <strong>Posts</strong>
          </h2>
        </Col>

        <Col sm={9}>
          <SortOptions />
        </Col>
      </Row>
    </Container>
  );
}

export default PostsSortMenu;
