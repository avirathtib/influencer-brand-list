import React, { Component } from "react";
import { db } from "../firebase-config";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import "../styles/profileCards.css";
import { Link } from "react-router-dom";

class Helpers {
  static contains(orig, filter) {
    let res = filter?.map((item) => {
      return orig?.includes(item);
    });
    return !res?.includes(false);
  }

  static hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }
}

// components
class BrandProfiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      profiles: [],
    };

    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleListTagClick = this.handleListTagClick.bind(this);
  }

  async componentDidMount() {
    let temp = [];
    console.log("if hello");
    const querySnapshot = await getDocs(collection(db, "Brand"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().extendedProfileCreated == true) {
        temp.push(doc.data());
      }
    });
    this.setState({ profiles: temp });
    console.log(this.state.profiles);
  }

  handleTagChange(tags) {
    this.setState({ tags });
  }

  handleListTagClick(tag) {
    this.setState({ tags: [...this.state.tags, tag] });
  }

  render() {
    return (
      <div>
        <TagInput onTagChange={this.handleTagChange} tags={this.state.tags} />
        <ExampleList
          items={this.state.profiles}
          filter={this.state.tags}
          onTagClick={this.handleListTagClick}
        />
      </div>
    );
  }
}

class TagInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      tags: this.props.tags || [],
    };

    this.handleNewTag = this.handleNewTag.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.notDuplicate = this.notDuplicate.bind(this);
    this.updateControlledTags = this.updateControlledTags.bind(this);
  }

  handleNewTag(tags) {
    if (this.props.onNewTag) this.props.onNewTag(tags);
    if (this.props.onTagChange) this.props.onTagChange(tags);
  }

  handleInputChange({ target: { value: inputValue } }) {
    inputValue = inputValue == "," ? "" : inputValue;
    this.setState({ inputValue });
  }

  handleKeyDown(e) {
    let {
      key,
      target: { value },
    } = e;
    let { tags } = this.state;
    switch (key) {
      case "Tab":
        if (value) e.preventDefault();
      case "Enter":
      case ",":
        value = value.trim();
        if (value && this.notDuplicate(tags, value)) {
          this.addTag(value);
        } else {
          this.setState({ inputValue: "" });
        }
        break;
      case "Backspace":
        if (!value) {
          this.handleTagDelete(tags.length - 1);
        }
        break;
    }
  }

  handleTagDelete(index, e) {
    this.deleteTag(index, () => {
      this.props.onTagChange(this.state.tags);
    });
  }

  deleteTag(index, callback) {
    let tags = this.state.tags.slice();

    tags.splice(index, 1);
    this.setState({ tags }, () => {
      if (callback) callback();
    });
  }

  notDuplicate(tags, newTag) {
    return !tags.includes(newTag) || this.props.allowDuplicates;
  }

  addTag(tag) {
    if (this.notDuplicate(this.state.tags, tag)) {
      this.setState({ tags: [...this.state.tags, tag], inputValue: "" }, () => {
        this.handleNewTag(this.state.tags);
      });
    }
  }

  updateControlledTags(tags) {
    if (tags && !Helpers.hasDuplicates(tags)) {
      this.setState({ tags }, () => {
        // this.props.onTagChange(tags);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateControlledTags(nextProps.tags);
  }

  render() {
    return (
      <span className="tagInputWrapper">
        <TagsList
          tags={this.state.tags}
          onTagDelete={this.handleTagDelete}
          hashtag={this.props.hashtag}
        />
        <input
          name="tagInput"
          className="tagInput"
          placeholder="enter a tag..."
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
      </span>
    );
  }
}

const TagsList = ({ tags, onTagDelete, hashtag }) => {
  let list = tags.map((tag, index) => (
    <Tag name={tag} onDelete={onTagDelete} index={index} hashtag={hashtag} />
  ));
  return (
    <ul name="tagsList" className="tagsList">
      {list}
    </ul>
  );
};

const Tag = ({ name, index, onDelete, hashtag, hashtagStyled }) => {
  return (
    <li>
      {hashtag && (
        <span
          style={{ color: "#898989", fontWeight: "bold", ...hashtagStyled }}
        >
          #{" "}
        </span>
      )}
      {name}
      <a href="#" onClick={(e) => onDelete(index, e)}>
        x
      </a>
    </li>
  );
};

const ExampleList = ({ items, filter, onTagClick }) => {
  let filtered = items.filter((item) => Helpers.contains(item.tags, filter));

  let renderedItems = filtered.map(
    ({ name, jobSummary, tags, extendedProfileCreated, email }, index) => {
      return (
        <ExampleListItem
          name={name}
          jobSummary={jobSummary}
          tags={tags}
          key={index}
          extendedProfileCreated={extendedProfileCreated}
          onClick={onTagClick}
          email={email}
        />
      );
    }
  );

  return (
    <div>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "0px",
          gridGap: "10px",
        }}
      >
        {renderedItems}
      </ul>
    </div>
  );
};

const ExampleListItem = ({
  name,
  jobSummary,
  tags,
  extendedProfileCreated,
  key,
  email,
  onClick,
}) => {
  const renderedTags = tags?.map((tag) => (
    <li onClick={(e) => onClick(tag, e)} className="tag clickable">
      {tag}
    </li>
  ));
  //#endregion
  console.log(extendedProfileCreated);

  return (
    <li
      style={{
        padding: 10,
        listStyle: "none",
        background: "#efefef",
        borderRadius: "10px",
        boxShadow: "1px 1px 5px #aaa",
      }}
    >
      <h3>{name}</h3>
      <p>{jobSummary}</p>

      <ul className="tagsList" style={{ padding: 0 }}>
        {renderedTags}
      </ul>
      <div>
        <Link to={{ pathname: `/companies/${name}`, state: { email: email } }}>
          View Profile
        </Link>
        {/* // <Link>
        //   to={`/companies/${name}`}
        //   params={{ email: email }}
        //   className="button-17"
        //   style={{ textDecoration: "none" }}
        // >
        //   View Profile
        // </Link> */}
      </div>
    </li>
  );
};

export default BrandProfiles;
