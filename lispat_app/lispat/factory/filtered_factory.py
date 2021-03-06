import nltk
import string
from lispat_app.lispat.utils.logger import Logger
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from lispat_app.lispat.base.constants import DESIRED_TERMS, DESIRED_PHRASE


logger = Logger("Filter Factory")


class FilteredFactory:

    def __init__(self):
        self.tokens = []
        self.stripped = None
        self.stop_word_var = None
        self.int_var = None
        self.punct_var = None
        self.long_words_var = None
        self.lemm_var = None
        self.stem_var = None

    def lower(self, w):
        self.tokens.append(w)
        return w.lower()

    def tokenize(self, val):
        tokens = [w.lower() for w in word_tokenize(val)]
        self.tokens = tokens
        return tokens

    def translate(self, val):
        table = str.maketrans('', '', string.punctuation)
        stripped = [w.translate(table) for w in val]
        return stripped

    def punctuation(self, val):
        logger.getLogger().debug("Removing punctuation")
        punct = [w for w in val if w.isalnum()]
        return punct

    def remove_names(self, val):
        logger.getLogger().debug("Removing names")
        remove_list = ['pope', 'benjamin', 'ben', 'iso', 'iec', 'fda',
                        'isoiec', 'bsi', 'nist', 'aami', 'nistir', 'ihs',
                        'isoiecieee', 'matthew', 'vorhees', 'vorhe', 'ots',
                        'cfr']
        words = [w for w in val if w not in remove_list]
        return words

    def stop_words(self, val):
        logger.getLogger().debug("Removing stop words")
        stop_words = set(stopwords.words('english'))
        words = [w for w in val if w not in stop_words]
        return words

    def integers(self, val):
        logger.getLogger().debug("Removing integers")
        words = [w for w in val if not any(c.isdigit() for c in w)]
        return words

    def long_words(self, val):
        logger.getLogger().debug("Removing long words")
        words = [w for w in val if not len(w) > 50]
        return words

    def lemmatize(self, val):
        logger.getLogger().debug("Lemmatizing words")
        wnl = nltk.WordNetLemmatizer()
        lemmed = [wnl.lemmatize(i) for i in val]
        return lemmed

    def stemmer(self, val):
        logger.getLogger().debug("Stemming words")
        port = nltk.PorterStemmer()
        words = [port.stem(i) for i in val]
        return words

    def get_stem(self, word):
        for suffix in ['ing', 'ly', 'ed', 'ious', 'ies', 'ive', 'es', 's',
                        'ment', 'y']:
            if word.endswith(suffix):
                return word[:-len(suffix)]
        return word

    def find_ngrams(self, data, n=3):
        return zip(*[data[i:] for i in range(n)])

    def get_desired_terms(self, val):
        for w in val:
            if w in DESIRED_TERMS:
                return val
        return []

    def get_desired_phrase(self, val):
        for w in val:
            if w in DESIRED_PHRASE:
                return val
        return []
