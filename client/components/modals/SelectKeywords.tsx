import React, { useState, useEffect } from 'react';

import { keywordsSamples } from '../../constants/keywords-sample';

import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Container,
  Flex,
  Text,
  Stack,
  SimpleGrid,
  Tag,
  TagLabel,
  TagCloseButton,
  TagRightIcon,
  ButtonGroup,
} from '@chakra-ui/react';

import {
  ButtonBlue,
  ButtonOrange,
} from '../../styles/ui-components/Chakra-Button';

import { AddIcon, SearchIcon } from '@chakra-ui/icons';

type KeywordProps = {
  keywordsData: Array<string>;
  keywordsDataHandler: () => void;
  closeKeywordModal: () => void;
};

export default function KeywordSelect({
  keywordsDataHandler,
  closeKeywordModal,
  keywordsData,
}: KeywordProps) {
  let keywords = keywordsSamples;

  const [searchKeywords, setSearchKeywords] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywordsActive, setKeywordsActive] = useState(false);

  useEffect(() => {
    if (keywordsData && selectedKeywords) {
      Object.values(keywordsData).forEach((keyword) => {
        selectKeyword(keyword.keyword);
      });
    }
  }, [selectedKeywords]);

  const selectKeyword = (e) => {
    //Limits the number of selected keywords to 10
    const isInArray = selectedKeywords.find((element) => element.keyword === e);
    if (isInArray || selectedKeywords.length >= 10) {
      return;
    }

    //Merges the selected keywords with the state
    setSelectedKeywords((prevKeywords) => {
      const updatedKeywords = [...prevKeywords];
      updatedKeywords.unshift({ keyword: e, id: Math.random().toString() });
      return updatedKeywords;
    });
    setKeywordsActive(true);
  };

  //Deletes keywords from selected list
  const deleteKeywords = (e) => {
    setSelectedKeywords((prevKeywords) => {
      const updatedKeywords = prevKeywords.filter(
        (keyword) => keyword.id !== e
      );
      return updatedKeywords;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    keywordsDataHandler(selectedKeywords);
    closeKeywordModal();
  };

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="100vh"
        bg="rgba(0, 0, 0, 0.5)"
        onClick={closeKeywordModal}
      ></Box>

      <Box
        position="fixed"
        borderRadius="18px"
        p={5}
        m="auto"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%);"
        w={{ '2xl': '50%', sm: '80%' }}
        h="fit-content"
        textAlign="center"
        bg="#ffffff"
        zIndex={1000}
      >
        <Stack
          width="100%"
          height="fit-content"
          overflow="hidden"
          text-overflow="clip"
          word-break="break-all"
          white-space="pre-wrap"
        >
          <Stack m="auto" textAlign="center" spacing={2}>
            <Heading size="md">Keywords to Choose</Heading>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                value={searchKeywords}
                onInput={(e) => setSearchKeywords(e.target.value)}
                placeholder="Write skills or positions"
                w="100%"
                textAlign="center"
              />
            </InputGroup>
          </Stack>
          <SimpleGrid spacing={1} templateColumns="repeat(3, 3fr)" h="52px">
            {keywords
              .filter((keyword) => {
                if (searchKeywords === '') {
                  return keyword;
                } else if (
                  keyword.name
                    .toLowerCase()
                    .includes(searchKeywords.toLowerCase())
                ) {
                  return keyword;
                }
                {
                  return false;
                }
              })
              .map((keyword, index) => (
                <Tag
                  cursor="pointer"
                  colorScheme="blue"
                  w="100%"
                  key={index}
                  onClick={(e) => selectKeyword(keyword.name)}
                >
                  <TagLabel m="auto">{keyword.name}</TagLabel>
                  <TagRightIcon as={AddIcon} />
                </Tag>
              ))}
          </SimpleGrid>
        </Stack>

        <Stack spacing={2} mt="2.5%">
          <Container>
            <Heading size="sm">
              {selectedKeywords && selectedKeywords.length} Selected Keywords{' '}
              <Text as="em" fontWeight="light">
                (Max 10)
              </Text>
            </Heading>
          </Container>
          <SimpleGrid spacing={1} templateColumns="repeat(2, 5fr)">
            {selectedKeywords &&
              selectedKeywords.length >= 0 &&
              selectedKeywords.map((keyword, index) => (
                <Tag
                  colorScheme="red"
                  w="100%"
                  key={index}
                  onClick={(e) => deleteKeywords(keyword.id)}
                >
                  <TagLabel m="auto">{keyword.keyword}</TagLabel>
                  <TagCloseButton />
                </Tag>
              ))}
          </SimpleGrid>
        </Stack>

        <ButtonGroup
          display="flex"
          flexDirection="column"
          m="5px"
          padding="1px"
          w="100%"
        >
          <ButtonBlue onClick={onSubmit}>Save Links</ButtonBlue>
          <ButtonOrange onClick={closeKeywordModal}>Cancel</ButtonOrange>
        </ButtonGroup>
      </Box>
    </>
  );
}
