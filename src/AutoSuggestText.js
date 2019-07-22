import React from 'react';

export default class AutoSuggestText extends React.Component {
    constructor(props) {
        super(props)

        this.items = [
            'Item 1',
            'Item 2',
            'Item 3'
        ];

        this.state = {
            suggestions: [],
            text: ""
        };
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }

        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: []
        }));
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }

        return (
            <ul>
                {suggestions.map((item) => <div onClick={() => this.suggestionSelected(item)} key={item}>{item}</div>)}
            </ul>
        )
    }
    render() {
        const { text } = this.state;
        return (
            <div>
                <input value={text} type="text" onChange={this.onTextChanged}/>
                {this.renderSuggestions()}
            </div>
        );
    }
}