class TrieNode {
  constructor(value) {
    this.value = value;
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!current.children[char]) {
        current.children[char] = new TrieNode(char);
      }
      current = current.children[char];
    }

    current.isEnd = true;
  }

  find(prefix) {
    let current = this.root;

    for (let i = 0; i < prefix.length; i++) {
      let char = prefix[i];
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }

    return this.findAllWords(current, prefix);
  }

  findAllWords(current, prefix) {
    let results = [];

    if (current.isEnd) {
      results.push(prefix);
    }

    for (let child in current.children) {
      results = results.concat(
        this.findAllWords(current.children[child], prefix + child)
      );
    }

    return results;
  }
}

export { Trie };

// c++ code 
// #include <iostream>
// #include <unordered_map>
// #include <string>
// #include <vector>

// using namespace std;

// // Trie node class
// class TrieNode {
// public:
//   char value;
//   unordered_map<char, TrieNode*> children;
//   bool isEnd;

//   TrieNode(char value) {
//     this->value = value;
//     this->isEnd = false;
//   }
// };

// // Trie class
// class Trie {
// public:
//   TrieNode* root;

//   Trie() {
//     this->root = new TrieNode(NULL);
//   }

//   void insert(string word) {
//     TrieNode* current = root;

//     for (char c : word) {
//       if (current->children.count(c) == 0) {
//         current->children[c] = new TrieNode(c);
//       }
//       current = current->children[c];
//     }

//     current->isEnd = true;
//   }

//   vector<string> find(string prefix) {
//     TrieNode* current = root;

//     for (char c : prefix) {
//       if (current->children.count(c) == 0) {
//         return vector<string>();
//       }
//       current = current->children[c];
//     }

//     return findAllWords(current, prefix);
//   }

// private:
//   vector<string> findAllWords(TrieNode* node, string prefix) {
//     vector<string> results;

//     if (node->isEnd) {
//       results.push_back(prefix);
//     }

//     for (pair<char, TrieNode*> child : node->children) {
//       results.insert(results.end(), findAllWords(child.second, prefix + child.first).begin(), findAllWords(child.second, prefix + child.first).end());
//     }

//     return results;
//   }
// };

// int main() {
//   Trie trie;

//   trie.insert("hello");
//   trie.insert("hi");
//   trie.insert("howdy");
//   trie.insert("hey");

//   vector<string> words = trie.find("h");
//   for (string word : words) {
//     cout << word << endl;
//   }

//   // Output:
//   // hello
//   // hi
//   // howdy
//   // hey

//   return 0;
// }
