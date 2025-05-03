import React from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  SimpleGrid,
  AspectRatio,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaInstagram, FaWikipediaW } from 'react-icons/fa';

export default function SurferProCard({ surfer }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      mb={6}
      boxShadow="sm"
    >
      <Heading mb={2}>{surfer.name}</Heading>
      <Text mb={4}>{surfer.bio}</Text>

      <HStack spacing={4} mb={6}>
        {surfer.insta && (
          <Link href={surfer.insta} isExternal>
            <Icon as={FaInstagram} boxSize={6} />
          </Link>
        )}
        {surfer.wikiLink && (
          <Link href={surfer.wikiLink} isExternal>
            <Icon as={FaWikipediaW} boxSize={6} />
          </Link>
        )}
      </HStack>

      <SimpleGrid columns={[1, 2]} spacing={4}>
        {surfer.videos.map((v) => (
          <AspectRatio key={v.videoId} ratio={16 / 9}>
            <iframe
              title={v.title}
              src={`https://www.youtube.com/embed/${v.videoId}`}
              allowFullScreen
            />
          </AspectRatio>
        ))}
      </SimpleGrid>
    </Box>
  );
}
