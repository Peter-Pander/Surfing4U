// src/components/SurferProCard.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  SimpleGrid,
  AspectRatio,
  HStack,
  Icon,
  Textarea,
  Input,
  IconButton,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { FaInstagram, FaWikipediaW } from 'react-icons/fa';
import { DeleteIcon, AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

export default function SurferProCard({ surfer, isAdmin = false, onUpdate }) {
  const toast = useToast();
  const API   = import.meta.env.VITE_API_BASE || '';

  // local state for instant UI updates
  const [bioValue, setBioValue]     = useState(surfer.bio || '');
  const [instaValue, setInstaValue] = useState(surfer.insta || '');

  // sync when parent prop changes
  useEffect(() => {
    setBioValue(surfer.bio || '');
    setInstaValue(surfer.insta || '');
  }, [surfer.bio, surfer.insta]);

  // detect if we need to show Save/Cancel
  const hasChanges =
    bioValue   !== (surfer.bio  || '') ||
    instaValue !== (surfer.insta || '');

  // helper: make a PATCH to update bio/insta
  const saveChanges = async () => {
    const payload = {};
    if (bioValue   !== surfer.bio)   payload.bio   = bioValue;
    if (instaValue !== surfer.insta) payload.insta = instaValue;

    try {
      console.log('Saving payload', payload);
      const res = await fetch(`${API}/api/surfers/${surfer._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('PATCH status', res.status, res.statusText);
      if (!res.ok) {
        const errBody = await res.text();
        console.error('Error body:', errBody);
        throw new Error(`HTTP ${res.status}`);
      }
      const updated = await res.json();
      onUpdate(updated);
      toast({
        title: 'Profile updated.',
        description: 'Your changes have been saved 🎉',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Save failed', err);
      toast({
        title: 'Error saving profile.',
        description: 'Could not save — check console.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // discard edits
  const cancelChanges = () => {
    setBioValue(surfer.bio || '');
    setInstaValue(surfer.insta || '');
  };

  // delete a video
  const deleteVideo = async (idx) => {
    try {
      const res = await fetch(
        `${API}/api/surfers/${surfer._id}/videos/${idx}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated = await res.json();
      onUpdate(updated);
      toast({
        title: 'Video removed.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Delete video failed', err);
      toast({
        title: 'Error removing video.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // add a video
  const addVideo = async () => {
    const url = prompt('YouTube URL:');
    if (!url) return;
    try {
      const res = await fetch(`${API}/api/surfers/${surfer._id}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated = await res.json();
      onUpdate(updated);
      toast({
        title: 'Video added.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Add video failed', err);
      toast({
        title: 'Error adding video.',
        description: 'Check the URL and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // colors
  const cardBg      = useColorModeValue('white',    'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      p={4}
      mb={6}
      boxShadow="sm"
    >
      <Heading mb={2}>{surfer.name}</Heading>

      {isAdmin ? (
        <Textarea
          mb={4}
          value={bioValue}
          onChange={(e) => setBioValue(e.target.value)}
          placeholder="Surfer bio…"
        />
      ) : (
        <Text mb={4}>{surfer.bio}</Text>
      )}

      <HStack spacing={4} mb={6}>
        {isAdmin ? (
          <HStack>
            <Input
              placeholder="Instagram URL"
              value={instaValue}
              onChange={(e) => setInstaValue(e.target.value)}
              width="auto"
            />
            <IconButton
              aria-label="Clear Insta"
              icon={<CloseIcon />}
              size="sm"
              onClick={() => setInstaValue('')}
            />
            {instaValue && (
              <Link href={instaValue} isExternal>
                <Icon as={FaInstagram} boxSize={6} />
              </Link>
            )}
          </HStack>
        ) : (
          surfer.insta && (
            <Link href={surfer.insta} isExternal>
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
          )
        )}
        {surfer.wikiLink && (
          <Link href={surfer.wikiLink} isExternal>
            <Icon as={FaWikipediaW} boxSize={6} />
          </Link>
        )}
      </HStack>

      {isAdmin && hasChanges && (
        <HStack mb={6} spacing={2}>
          <Button
            size="sm"
            leftIcon={<CheckIcon />}
            colorScheme="green"
            onClick={saveChanges}
          >
            Save
          </Button>
          <Button
            size="sm"
            leftIcon={<CloseIcon />}
            variant="outline"
            onClick={cancelChanges}
          >
            Cancel
          </Button>
        </HStack>
      )}

      <SimpleGrid columns={[1, 2]} spacing={4}>
        {surfer.videos.map((v, idx) => (
          <Box key={v.videoId} position="relative">
            <AspectRatio ratio={16 / 9}>
              <iframe
                title={v.title}
                src={`https://www.youtube.com/embed/${v.videoId}`}
                allowFullScreen
              />
            </AspectRatio>
            {isAdmin && (
              <IconButton
                aria-label="Delete video"
                icon={<DeleteIcon />}
                size="sm"
                position="absolute"
                top="4px"
                right="4px"
                onClick={() => deleteVideo(idx)}
              />
            )}
          </Box>
        ))}
      </SimpleGrid>

      {isAdmin && (
        <Button leftIcon={<AddIcon />} mt={4} onClick={addVideo}>
          Add Video
        </Button>
      )}
    </Box>
  );
}
