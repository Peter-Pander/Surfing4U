// src/components/SurferProCard.jsx

import React, { useState, useEffect } from 'react'
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
} from '@chakra-ui/react'
import { FaInstagram, FaWikipediaW } from 'react-icons/fa'
import { DeleteIcon, AddIcon } from '@chakra-ui/icons'

export default function SurferProCard({
  surfer,
  isAdmin = false,
  onUpdate,
}) {
  // local state for instant UI updates
  const [bioValue, setBioValue] = useState(surfer.bio)
  const [instaValue, setInstaValue] = useState(surfer.insta)

  // sync when parent gives us a brand-new surfer prop
  useEffect(() => {
    setBioValue(surfer.bio)
    setInstaValue(surfer.insta)
  }, [surfer.bio, surfer.insta])

  // patch a single field and bubble the updated doc up
  const patchField = async (field, value) => {
    const res = await fetch(`/api/surfers/${surfer._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    })
    const updated = await res.json()
    onUpdate(updated)
  }

  // remove one video by index
  const deleteVideo = async (idx) => {
    const res = await fetch(
      `/api/surfers/${surfer._id}/videos/${idx}`,
      { method: 'DELETE' }
    )
    const updated = await res.json()
    onUpdate(updated)
  }

  // prompt + add a new video URL
  const addVideo = async () => {
    const url = prompt('Enter YouTube URL:')
    if (!url) return
    const res = await fetch(`/api/surfers/${surfer._id}/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    const updated = await res.json()
    onUpdate(updated)
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={6} boxShadow="sm">
      <Heading mb={2}>{surfer.name}</Heading>

      {/* bio (editable in admin mode) */}
      {isAdmin ? (
        <Textarea
          mb={4}
          value={bioValue}
          onChange={(e) => setBioValue(e.target.value)}
          onBlur={(e) => patchField('bio', e.target.value)}
        />
      ) : (
        <Text mb={4}>{surfer.bio}</Text>
      )}

      {/* insta + wiki */}
      <HStack spacing={4} mb={6}>
        {isAdmin ? (
          <HStack>
            <Input
              placeholder="Instagram URL"
              value={instaValue || ''}
              onChange={(e) => setInstaValue(e.target.value)}
              onBlur={(e) => patchField('insta', e.target.value)}
              width="auto"
            />
            <IconButton
              aria-label="Delete Instagram URL"
              icon={<DeleteIcon />}
              size="sm"
              onClick={() => {
                setInstaValue('')
                patchField('insta', '')
              }}
            />
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

      {/* video grid */}
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

      {/* add video button */}
      {isAdmin && (
        <Button leftIcon={<AddIcon />} mt={4} onClick={addVideo}>
          Add Video
        </Button>
      )}
    </Box>
  )
}
